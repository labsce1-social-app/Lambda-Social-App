import React, { useContext } from 'react';
import { Store } from '../../context'
import { CardItem, Thumbnail, Body, Text } from 'native-base';
import { Image, View } from 'react-native';
import Reaction from '../../common/Reaction';
import style from './Style';
import { config } from '../../utils/dimensions';
import moment from 'moment';
import { upvoteDiscussion, downvoteDiscussion } from '../../utils/Requests';

const ImagePost = props => {
  if (!props.discussion_image) {
    return null;
  } else {
    const imageUrl = props.discussion_image;
    return <Image source={{ url: imageUrl }} />;
  }
};

const PostHeader = props => {
  const { state, dispatch } = useContext(Store);

  // handles adding upvotes, sends data to context reducer
  const upvote = (discussion_id) => {
    const newUpvote = {
      user_id: state.user.id,
      discussion_id
    }
    upvoteDiscussion(dispatch, newUpvote);
  }

  const downvote = (discussion_id) => {
    const newDownvote = {
      user_id: state.user.id,
      discussion_id
    }
    downvoteDiscussion(dispatch, newDownvote);
  }
  return (
    <>
      <CardItem
        style={{
          maxHeight: config.deviceHeight * 0.35,
          minHeight: config.deviceHeight * 0.35,
          overflow: 'scroll'
        }}
      >
        <Body>
          <Text>{props.title}</Text>
          <Text note>
            {moment(props.discussion_date).format('DD MMM YY hh:mm am')}
          </Text>
          <Thumbnail
            source={{ url: props.creator_avatar }}
            style={style.avatar}
          />
          <Text>{props.creator}</Text>

          <ImagePost style={style.post_image} />

          <Text>{props.discussion_content}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignSelf: 'flex-end',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: 20,
            height: 40,
            padding: 10
          }}
        >
          <Reaction
            count={props.upvotes}
            voted={props.voted}
            handlePressFirst={() => props.voted === false ? upvote(props.id) : downvote(props.id)}
            handlePressSecond={() => props.voted === true ? downvote(props.id) : upvote(props.id)}
            image={require('../../assets/like.png')}
          />
        </View>
      </CardItem>
    </>
  );
};

export default PostHeader;
