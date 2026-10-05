import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PubNub, { PubnubConfig } from "pubnub";
import { PubNubProvider } from "pubnub-react";
import users from "../../data/users/users.json";
import newUsers from '../../utils/newUsers.json'
import SingleChat from "../../components/Chat/singleChat";
import GroupChat from "../../components/Chat/groupChat";
import { history } from "../../reduxStore/store";

import { connect } from 'react-redux'

const PamError = () => {
    return (
        <div className="pubnub-error">
            <h1>Warning! PubNub access manager enabled.</h1>
            <p>
                It looks like you have access manager enabled on your PubNub keyset. This sample app is not
                adapted to work with PAM by default.
            </p>
            <p>
                You can either disable PAM in the{" "}
                <a href="https://dashboard.pubnub.com/">PubNub Admin Portal</a> or add custom code to grant
                all necessary permissions by yourself. Please referer to the{" "}
                <a href="https://www.pubnub.com/docs/chat/components/react/access-manager">
                    Chat Component docs
                </a>{" "}
                for more information.
            </p>
        </div>
    );
};

const KeysError = () => {
    return (
        <div className="pubnub-error">
            <h1>A PubNub account is required.</h1>
            <p>
                Visit the PubNub dashboard to create an account or login:
                <br />
                <a href="https://dashboard.pubnub.com/">https://dashboard.pubnub.com/</a>
                <br />
                Create a new app or locate your app in the dashboard. Enable the Presence, Files, Objects,
                and Storage features using a region of your choosing. For Objects, ensure the following are
                enabled:
            </p>
            <ul>
                <li>User Metadata Events</li>
                <li>Channel Metadata Events</li>
                <li>Membership Events</li>
            </ul>
            <p>Copy and paste your publish key and subscribe key into: </p>
            <pre>.env</pre>
            <p>before continuing.</p>
        </div>
    );
};

const PubnubChat = (props) => {

    const { loginInfo } = props

    const hash = document.location.hash.split("?")[1];
    const params = new URLSearchParams(hash);
    const uuid = params.get("uuid");

    const pubnubKeys = {
        publishKey: params.get("pubkey") || (process.env.REACT_APP_PUB_KEY),
        subscribeKey: params.get("subkey") || (process.env.REACT_APP_SUB_KEY),
    };
    const pubnub = new PubNub({
        ...pubnubKeys,
        userId: `${loginInfo?.id}`,
        // userId: uuid || users[1].id,
        fileUploadPublishRetryLimit: 0
    });


    /** Detect PubNub access manager */
    let pamEnabled = false;
    pubnub.addListener({
        status: function (status) {
            if (status.category === "PNAccessDeniedCategory") {
                pamEnabled = true;
                // renderApp();
            }
        },
    });


    return (
        pubnubKeys.publishKey?.length && pubnubKeys.subscribeKey?.length ? (
            pamEnabled ? (
                <PamError />
            ) : (
                <PubNubProvider client={pubnub}>
                    {history.location.pathname === "/admin/messages" ?
                        <SingleChat />
                        :
                        history.location.pathname === "/admin/group_chat" &&
                        < GroupChat />
                    }
                </PubNubProvider>
            )
        ) : (
            <KeysError />
        )
    )
}


const mapStateToProps = (state) => ({
    loginInfo: state.login.loginInfo
})

export default connect(mapStateToProps, null)(PubnubChat)