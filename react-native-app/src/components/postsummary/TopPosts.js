import React from 'react';
import { FlatList, Text } from 'react-native-gesture-handler';
import { Spinner } from 'native-base';
import { BASE_URL } from 'react-native-dotenv';
import PostSummary from './PostSummary';

class TopPosts extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            loading: true
        }
        fetchPost = this.fetchPost.bind(this);
    }

    componentDidMount() {
        this.fetchPost()
    };

    async fetchPost() {
        const url = `${BASE_URL}/subtopics`;
        // const url = 'http://localhost:3000/subtopics/'
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            //TODO: get this off of top 10 upvoted later, for now just render 10
            return this.setState({ posts: responseJson.slice(0, 10) });
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        if (!this.state.posts) {
            return <Spinner />
        } else {
            return (
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item, index) => item.id}
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
                    refreshing={this.state.refresh}
                    onRefresh={() => this.toRefresh}
                />
            )
        }
    }
}

export default TopPosts