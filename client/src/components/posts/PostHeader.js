
import React, { useContext } from 'react';
import { Store } from '../../context'
import {
  CardItem,
  Thumbnail,
  Text,
  Content
} from 'native-base';
import { Image, View } from 'react-native';
import Reaction from '../../common/Reaction';
import style from './Style';
import moment from 'moment';
import { upvoteDiscussion, downvoteDiscussion } from '../../context/actions/upvoteActions';

// doesn't seem to be used??
// const ImagePost = props => {
//   if (!props.discussion_image) {
//     return null;
//   } else {
//     const imageUrl = props.discussion_image;
//     return <Image source={{ url: imageUrl }} />;
//   }
// };

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
    <CardItem>
      <Content>
        <View>
          <View style={style.top}>
            <Text style={style.heading}>{props.creator}</Text>
            <Text note style={style.heading}>
              {moment(props.discussion_date).format('DD MMM YY hh:mm am')}
            </Text>
          </View>

          <Text style={style.title}>{props.title}</Text>

          <Thumbnail
            source={{ uri: props.creator_avatar }}
            style={props.creator_avatar ? style.avatar : { height: 0 }}
          />
          <Text style={{ marginBottom: 10 }}>{props.discussion_content}</Text>

          <Image
            style={style.post_image}
            source={{ uri: props.discussion_image }}
          />
        </View>
        <View style={{
          width: 100,
          flex: 1,
          flexDirection: 'row'
        }}>
          <Reaction
            image={require('../../assets/up.png')}
            count={props.upvotes}
            voted={props.voted}
            color="green"
            handlePress={() => upvote(props.id)}
          />
          <Reaction
            image={require('../../assets/down.png')}
            voted={props.voted}
            color="orange"
            handlePress={() => downvote(props.id)}
          />
        </View>
      </Content>
    </CardItem>
  );
};

export default PostHeader;
