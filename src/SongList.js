import React, { useState, useEffect, useRef } from "react";
import List from "@material-ui/core/List";
import InfiniteScroll from "react-infinite-scroll-component";

export default function SongList(props) {
  const isInitialMount = useRef(true);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([]);
  const fetchMoreNum = 50;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log("updating");
    }
    setItems(!!props.songList && props.songList.slice(0, fetchMoreNum));
  }, [props.songList]);

  const fetchMoreData = () => {
    if (items.length >= props.songList.length) {
      setHasMore(false);
      return;
    }

    if (!!props.songList) {
      setItems(items.concat(props.songList.slice(items.length + 1, items.length - 1 + fetchMoreNum)));
    }
  };

  return (
    <React.Fragment>
      <List>
          {!!props.songList.length && (
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              height={500}
              endMessage={''}
            >
              {items.map((librarySong, index) => (
                <React.Fragment key={index}>
                  {React.cloneElement(props.songListItem, { 
                    key: index,
                    id: librarySong.id,
                    index: index,
                    title: librarySong.title,
                    duration: librarySong.duration,
                    album: librarySong.album,
                    artist: librarySong.artist,
                    songList: props.songList
                  })}
                </React.Fragment>
              ))}
            </InfiniteScroll>
          )}
      </List>
    </React.Fragment>
  );
}
