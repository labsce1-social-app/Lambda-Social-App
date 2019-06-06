import React from 'react';
import { Content, Container } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import { BASE_URL } from 'react-native-dotenv';
import PostSummary from './PostSummary';

class TopPosts extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
        fetchPost = this.fetchPost.bind(this);
    }

    componentDidMount() {
        this.fetchPost()
    }

    async fetchPost() {
        // const url = BASE_URL + '/subtopics';
        const url = 'http://localhost:3000/subtopics/'
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            //TODO: get this off of top 10 upvoted later, for now just render 10
            return this.setState({ posts: responseJson.slice(0, 10) });
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return (
            this.state.posts && <FlatList
                data={this.state.posts}
                renderItem={({ item }) => (
                    <PostSummary
                        image={item.image}
                        title={item.title}
                        discussion={item.content}
                        name={item.username}
                        date={item.created_at}
                        comment={'2'}
                    />
                )}
                keyExtractor={this._keyExtractor}
                refreshing={this.state.refresh}
                onRefresh={() => this.toRefresh}
            />
        )
    }
}

export default TopPosts