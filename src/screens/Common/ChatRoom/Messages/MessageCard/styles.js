import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';

const styles = StyleSheet.create({
  messageContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 12,
    marginBottom: 12,
    flexDirection: 'row',
  },
  messageContainerSender: {
    marginLeft: 120,
    marginRight: 20,
    marginTop: 12,
    marginBottom: 12,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messageContainerReceiver: {
    marginLeft: 20,
    marginRight: 120,
    marginTop: 12,
    left: 0,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  mediaMessageView: {
    marginTop: 10,
    marginBottom: 10,
  },
  messageView: {
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  sentMessageView: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  recievedMessageView: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 15,
    marginTop: 16,
    marginLeft: 8,
    marginRight: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageContainer: {
    position: 'relative',
    maxWidth: '100%',
  },
  messageImage: {
    height: 140,
    minWidth: '100%',
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  imageTimeText: {
    fontSize: 12,
    textAlign: 'right',
    position: 'absolute',
    padding: 10,
    backgroundColor: Colors.MessageImageTimeBRColor,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    right: 0,
    bottom: 0,
  },
  messageTimeText: {
    fontSize: 13,
    marginTop: 8,
    textAlign: 'right',
    marginRight: 8,
    paddingLeft: 15,
    paddingRight: 10,
    marginBottom: 16,
  },
  chatContainer: {
    backgroundColor: '#EDEDED',
  },
});

export default styles;
