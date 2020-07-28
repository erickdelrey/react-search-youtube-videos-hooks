import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import useVideos from '../hooks/useVideos';

const App = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, search] = useVideos('Rico Almoete');

    useEffect(() => {

        var selected = 0;
        if (videos.length > 0) {
            var date = videos[0].snippet.publishedAt;
            for (var x = 1; x < videos.length; x++) {
                if (videos[x].snippet.publishedAt > date) {
                    date = videos[x].snippet.publishedAt;
                    selected = x;
                }
            }
        }
        setSelectedVideo(videos[selected]);
    }, [videos]);

    return (
        <div className="ui container">
            <SearchBar onFormSubmit={search} />
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={selectedVideo} />
                    </div>
                    <div className="five wide column">
                        <VideoList
                            videos={videos}
                            onVideoSelect={setSelectedVideo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;