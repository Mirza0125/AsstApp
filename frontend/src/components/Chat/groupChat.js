import React, { useState, useEffect, useCallback, MouseEvent } from "react";
import { BaseObjectsEvent } from "pubnub";
import pickerData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { usePubNub } from "pubnub-react";
import moment from "moment";
import { connect } from 'react-redux'
import {
    ChannelEntity,
    ChannelList,
    Chat,
    MemberList,
    MessageEnvelope,
    MessageInput,
    MessageList,
    MessagePayload,
    TypingIndicator,
    useChannelMembers,
    useChannels,
    usePresence,
    useUser,
    useUserMemberships,
    useUsers,
} from "@pubnub/react-chat-components";
import { actionCompleted, containsEmoji } from "pubnub-demo-integration";

import { CreateChatModal } from "./components/create-chat-modal";
import { ReportUserModal } from "./components/report-user-modal";
import PublicChannelsModal from "./components/public-channels-modal";

import "./style.scss";
import { Images } from "../../theme/Images";
import { getUsersListRequest } from "../../pages/PubnubChat/redux/action";

const defaultChannel = {
    id: "default",
    name: "Default Channel",
    description: "This is the default channel",
};

const SendIcon = () => {
    return (
        <div className="send-button flex-justify-center">
            <img src={Images.sendIcon} alt="" />
        </div>
    )
}

const renderMessage = (props) => {
    let now = moment();
    let timeString = now.format('h:mm a');
    let dateDiff = moment().startOf('day').diff(now.startOf('day'), 'days');
    let dateString;

    var fileType = null;

    switch (dateDiff) {
        case 0:
            dateString = 'Today';
            break;
        case 1:
            dateString = 'Yesterday';
            break;
        default:
            dateString = Math.abs(dateDiff) + ' days ago';
            break;
    }

    if (props.message.messageType == null) {
        fileType = 'text';
    } else if (
        props?.message?.message?.file?.name.includes('.jpg') ||
        props?.message?.message?.file?.name.includes('.png') ||
        props?.message?.message?.file?.name.includes('.jpeg')
    ) {
        fileType = 'image';
    } else if (
        props?.message?.message?.file?.name.includes('.mp4') ||
        props?.message?.message?.file?.name.includes('.3gp') ||
        props?.message?.message?.file?.name.includes('.webm')
    ) {
        fileType = 'video';
    }

    const messageTime = dateString + ' - ' + timeString;
    console.log('props........', props);
    return (
        <>
            <img
                className="pn-msg__avatar"
                src={Images.userIcon}
                alt="User avatar"
            />
            <div className="pn-msg__main">
                {fileType == 'text' ? (
                    <div className="pn-msg__content">
                        <div className="pn-msg__title">
                            <span className="pn-msg__author">{props.user?.name}</span>
                        </div>
                        <div className="pn-msg__bubble">{props.message?.message.text}</div>
                        <p className="pn-msg__time">{messageTime}</p>
                    </div>
                ) : fileType == 'image' ? (
                    <>
                        <div className="pn-msg__content">
                            <div className="pn-msg__title">
                                <span className="pn-msg__author">{props.user?.name}</span>
                            </div>
                        </div>
                        <div class="pn-msg__extras">
                            <div class="pn-msg__file">
                                <img
                                    alt={props.message.message.file.name}
                                    class="pn-msg__image"
                                    src={props.message.message.file.url}
                                />
                            </div>
                        </div>
                        <p className="pn-msg__time">{messageTime}</p>
                    </>
                ) : (
                    fileType == 'video' && (
                        <>
                            <div className="pn-msg__content">
                                <div className="pn-msg__title">
                                    <span className="pn-msg__author">{props.user?.name}</span>
                                </div>
                            </div>
                            <div class="pn-msg__extras">
                                <div class="pn-msg__file">
                                    <video
                                        alt={props.message.message.file.name}
                                        class="pn-msg__image"
                                        src={props.message.message.file.url}
                                    />
                                </div>
                            </div>
                            <p className="pn-msg__time">{messageTime}</p>
                        </>
                    )
                )}
            </div>
        </>
    );
};

const GroupChat = (props) => {
    const [theme, setTheme] = useState("light");
    const [currentChannel, setCurrentChannel] = useState(defaultChannel);
    const [showMembers, setShowMembers] = useState(false);
    const [showChannels, setShowChannels] = useState(true);
    const [showPublicChannelsModal, setShowPublicChannelsModal] = useState(false);
    const [showCreateChatModal, setShowCreateChatModal] = useState(false);
    const [showReportUserModal, setShowReportUserModal] = useState(false);
    const [channelsFilter, setChannelsFilter] = useState("");
    const [membersFilter, setMembersFilter] = useState("");
    const [reportedMessage, setReportedMessage] = useState(null);
    const [showCreateGroupChatModal, setShowCreateGroupChatModal] = useState(false);

    /**
     * All data related to Users, Channels and Memberships is stored within PubNub Objects API
     * It can be easily accessed using React Chat Components hooks
     */
    // const pubnub = usePubNub();
    // const uuid = pubnub.getUUID();
    // const [currentUser] = useUser({ uuid });
    // const [allUsers] = useUsers({ include: { customFields: true } });
    // const [allChannels] = useChannels({ include: { customFields: true } });

    const { getUsersListRequest, usersListInfo, loginInfo } = props

    const pubnub = usePubNub();
    const uuid = pubnub.getUUID()
    const [currentUser, setCurrentUser] = useState(null);
    const [customUsers, setCustomUsers] = useState([]);

    useEffect(() => {
        getUsersListRequest();
    }, []);

    useEffect(() => {
        if (usersListInfo) {
            const customUsersArray = Array.isArray(usersListInfo) ? usersListInfo : [usersListInfo];
            setCustomUsers(customUsersArray);
        }
        setCurrentUser(loginInfo)
    }, [usersListInfo])

    const allUsers = [...customUsers, currentUser];
    const [allChannels] = useChannels({ include: { customFields: true } });

    const [joinedChannels, , refetchJoinedChannels] = useUserMemberships({
        include: { channelFields: true, customChannelFields: true }
    });
    const [channelMembers, , refetchChannelMemberships, totalChannelMembers] = useChannelMembers({
        channel: currentChannel.id,
        include: { customUUIDFields: true }
    });
    const [presenceData] = usePresence({
        channels: joinedChannels.length ? joinedChannels.map((c) => c.id) : [currentChannel.id]
    });

    /**
     * Some of the data related to current channel, current user and its' joined channels
     * has to be filtered down and mapped from the hooks data
     */
    const presentUUIDs = presenceData[currentChannel.id]?.occupants?.map((o) => o.uuid);
    // const groupChannels = joinedChannels.filter(
    //     (c) =>
    //         c.id?.startsWith("space.") && c.name?.toLowerCase().includes(channelsFilter.toLowerCase())

    // );
    const groupChannelsToJoin = allChannels.filter(
        (c) => c.id.startsWith("space.") && !joinedChannels.some((b) => c.id === b.id)
    );
    const groupChannels = joinedChannels
        .filter((c) => c.id?.startsWith("group."))
        .map((c) => {
            if (!c.id?.startsWith("group.")) return c;
            const interlocutorId = c.id.replace(uuid, "").replace("group.", "").replace("@", "");
            const interlocutor = allUsers.find((u) => u.id === interlocutorId);
            if (interlocutor) {
                c.custom = { profileUrl: interlocutor.profileUrl || "" };
                c.name = interlocutor.name;
            }
            return c;
        })
        .filter((c) => c.name?.toLowerCase().includes(channelsFilter.toLowerCase()));

    const isUserBanned = currentUser?.custom?.ban;
    const isUserMuted = (currentUser?.custom?.mutedChannels)
        ?.split(",")
        .includes(currentChannel.id);
    const isUserBlocked = (currentUser?.custom?.blockedChannels)
        ?.split(",")
        .includes(currentChannel.id);

    /**
     * Creating and removing channel memberships (not subscriptions!)
     */
    const leaveChannel = async (channel, event) => {
        event.stopPropagation();
        await pubnub.objects.removeMemberships({ channels: [channel.id] });
        setAnotherCurrentChannel(channel.id);
    };
    const refreshMemberships = useCallback((event) => {
        if (event.channel.startsWith("user_")) refetchJoinedChannels();
        if (event.channel === currentChannel.id) refetchChannelMemberships();
    }, [currentChannel, refetchJoinedChannels, refetchChannelMemberships]);

    const setAnotherCurrentChannel = (channelId) => {
        if (currentChannel.id === channelId) {
            const newCurrentChannel = joinedChannels?.find((ch) => ch.id !== channelId);
            if (newCurrentChannel) setCurrentChannel(newCurrentChannel);
        }
    };

    const handleError = (e) => {
        if (
            (e.status?.operation === "PNPublishOperation" && e.status?.statusCode === 403) ||
            e.message.startsWith("Publish failed")
        ) {
            alert(
                "Your message was blocked. Perhaps you tried to use offensive language or send an image that contains nudity?"
            );
        }

        console.warn(e);
    };

    useEffect(() => {
        if (currentChannel.id === "default" && joinedChannels.length)
            setCurrentChannel(joinedChannels[0]);
    }, [currentChannel, joinedChannels]);

    return (

        <div className={`app-moderated app-moderated--${theme}`}>
            <Chat
                theme={theme}
                users={allUsers}
                currentChannel={currentChannel.id}
                channels={[...joinedChannels.map((c) => c.id), uuid]}
                onError={handleError}
                onMembership={(e) => refreshMemberships(e)}
            >
                {showPublicChannelsModal && (
                    <PublicChannelsModal
                        {...{
                            groupChannelsToJoin,
                            hideModal: () => setShowPublicChannelsModal(false),
                            setCurrentChannel,
                        }}
                    />
                )}
                {showCreateGroupChatModal && (
                    <CreateChatModal
                        showGroupModal={showCreateGroupChatModal}
                        {...{
                            currentUser,
                            hideModal: () => setShowCreateGroupChatModal(false),
                            setCurrentChannel,
                            users: allUsers.filter((u) => u.id !== uuid),
                        }}
                    />
                )}
                {showReportUserModal && (
                    <ReportUserModal
                        {...{
                            currentUser,
                            reportedMessage,
                            hideModal: () => setShowReportUserModal(false),
                            users: allUsers,
                        }}
                    />
                )}
                {isUserBanned ? (
                    <strong className="error">Unfortunately, you were banned from the chat.</strong>
                ) : (
                    <>
                        <div className={`channels-panel ${showChannels && "shown"}`}>
                            <div className="left-side">
                                {/* <div className="user-info">
                                    {currentUser && <MemberList members={[currentUser]} selfText="" />}
                                    <button
                                        className="mobile material-icons-outlined"
                                        onClick={() => setShowChannels(false)}
                                    >
                                        close
                                    </button>
                                </div> */}

                                {/* <div className="theme-switcher">
                                    <i className="material-icons-outlined">brightness_4</i>
                                    <button
                                        className={theme}
                                        onClick={() => {
                                            setTheme(theme === "light" ? "dark" : "light");
                                            actionCompleted({ action: "Change the Theme" });
                                        }}
                                    >
                                        <span></span>
                                    </button>
                                </div> */}

                                {/* <div className="filter-input">
                                    <input
                                        onChange={(e) => setChannelsFilter(e.target.value)}
                                        placeholder="Search in..."
                                        type="text"
                                        value={channelsFilter}
                                    />
                                    <i className="material-icons-outlined">search</i>
                                </div> */}

                                <div className="channel-lists">
                                    {/* <h2>
                                        Channels{" "}
                                        <button
                                            className="material-icons-outlined"
                                            onClick={() => {
                                                setShowPublicChannelsModal(true);
                                                actionCompleted({ action: "Select '+' to Add a New Channel" });
                                            }}
                                        >
                                            +
                                        </button>
                                    </h2> */}
                                    {/* <div className="channel-list-wrapper">
                                        <ChannelList
                                            channels={groupChannels}
                                            onChannelSwitched={(channel) => {
                                                setCurrentChannel(channel);
                                                actionCompleted({ action: "Switch to a New Channel" });
                                            }}
                                            extraActionsRenderer={(c) => (
                                                <div
                                                    onClick={(e) => {
                                                        leaveChannel(c, e);
                                                        actionCompleted({ action: "Leave a Channel" });
                                                    }}
                                                    title="Leave channel"
                                                >
                                                    <i className="material-icons-outlined small">logout</i>
                                                </div>
                                            )}
                                        />
                                    </div> */}
                                    <div className="user-list-wrapper">
                                        <h2>
                                            Group chats
                                            <button
                                                className="material-icons-outlined"
                                                onClick={() => {
                                                    setShowCreateGroupChatModal(true);
                                                    actionCompleted({ action: "Scroll to & Select '+' to Add a 1:1 Chat" });
                                                }}
                                            >
                                                +
                                            </button>
                                        </h2>
                                        <ChannelList
                                            channels={groupChannels}
                                            onChannelSwitched={(channel) => {
                                                setCurrentChannel(channel);
                                                actionCompleted({ action: "Switch to a new 1:1 or Group Chat" });
                                            }}
                                            // extraActionsRenderer={(c) => (
                                            //     <div>
                                            //         5 Hours Ago
                                            //     </div>
                                            // )}
                                            extraActionsRenderer={(c) => (
                                                <div
                                                    onClick={(e) => {
                                                        leaveChannel(c, e);
                                                        actionCompleted({ action: "Leave Group Chat" });
                                                    }}
                                                    title="Leave channel"
                                                >
                                                    <i className="material-icons-outlined small">logout</i>
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="right-side">
                                <div className="chat-window">
                                    <div className="channel-info">
                                        <button
                                            className="mobile material-icons-outlined"
                                            onClick={() => setShowChannels(true)}
                                        >
                                            menu
                                        </button>
                                        <span onClick={() => setShowMembers(!showMembers)}>
                                            <strong className="flex-center">
                                                {currentChannel.name || currentChannel.id}
                                                {!isUserBlocked && <i className="material-icons-outlined">&gt;</i>}
                                            </strong>
                                            <p>{totalChannelMembers} members</p>
                                        </span>
                                        <hr />
                                    </div>
                                    {isUserBlocked ? (
                                        <strong className="error">
                                            Unfortunately, you were blocked from this channel.
                                        </strong>
                                    ) : (
                                        <>
                                            <MessageList
                                                fetchMessages={25}
                                                enableReactions={!isUserMuted}
                                                messageRenderer={renderMessage}
                                                // fileRenderer={renderFile}
                                                reactionsPicker={
                                                    isUserMuted ? undefined : <Picker data={pickerData} theme={theme} />
                                                }
                                                extraActionsRenderer={(message) =>
                                                    isUserMuted ? (
                                                        <></>
                                                    ) : (
                                                        <div
                                                            onClick={() => {
                                                                setReportedMessage(message);
                                                                setShowReportUserModal(true);
                                                            }}
                                                            title="Report user"
                                                        >
                                                            <i className="material-icons-outlined">campaign</i>
                                                        </div>
                                                    )
                                                }
                                            // fileRenderer={()=>(

                                            // )}
                                            />
                                            <TypingIndicator />
                                            <hr />
                                            <MessageInput
                                                disabled={groupChannels && groupChannels.length == 0}
                                                typingIndicator
                                                fileUpload="all"
                                                // emojiPicker={<Picker data={pickerData} theme={theme} />}
                                                placeholder={isUserMuted ? "You were muted from this channel" : "Type new message"}
                                                onSend={(message) => {
                                                    actionCompleted({
                                                        action: containsEmoji({ testString: (message).text })
                                                            ? "Send a Message with an Emoji"
                                                            : "Send a Chat Message",
                                                    });
                                                }}
                                                sendButton={<SendIcon />}
                                            />
                                        </>
                                    )}
                                </div>
                                <div className={`members-panel ${showMembers && !isUserBlocked ? "shown" : "hidden"}`}>
                                    <h2>
                                        Members
                                        <button className="material-icons-outlined" onClick={() => setShowMembers(false)}>
                                            close
                                        </button>
                                    </h2>
                                    <div className="filter-input">
                                        <input
                                            onChange={(e) => setMembersFilter(e.target.value)}
                                            placeholder="Search in members"
                                            type="text"
                                            value={membersFilter}
                                        />
                                        <i className="material-icons-outlined">search</i>
                                    </div>
                                    <MemberList
                                        members={channelMembers.filter((c) =>
                                            c.name?.toLowerCase().includes(membersFilter.toLowerCase())
                                        )}
                                        presentMembers={presentUUIDs}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Chat>
        </div>
    )
}

const mapStateToProps = (state) => ({
    usersListInfo: state.pubnubChat.usersListInfo,
    requesting: state.pubnubChat.requesting,
    error: state.pubnubChat.error,
    loginInfo: state.login.loginInfo
})

const mapDispatchToProps = dispatch => ({
    getUsersListRequest: data => dispatch(getUsersListRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupChat)