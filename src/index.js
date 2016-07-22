import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

/*
Google API key - YouTube
 AIzaSyCUW0B-NozD1Wp0Mc-65UVurzfstbwfbXg

console.developers.google.com
 */
const API_KEY = 'AIzaSyCUW0B-NozD1Wp0Mc-65UVurzfstbwfbXg';

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
            /*
             this.setState({videos});
             is equivalent to:
             this.setState({videos: videos});
             */
        });
    }

    render () {

        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar searchTermChangeFn={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    videoSelectFn={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}
                />
            </div>
        );
    }
};
/*
Take this component's HTML and put it on the page (DOM).
 */
ReactDOM.render(<App />, document.querySelector('.container'));
