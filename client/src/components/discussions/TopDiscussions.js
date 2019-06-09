import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Discussion from './Discussion';

//TODO: refactor to hooks
class TopDiscussions extends React.Component {
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
        const url = `${process.env.BASE_URL}/subtopics`;
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
                    <Discussion
                        image={item.image}
                        title={item.title.split(' ').join('-')}
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

export default TopDiscussions