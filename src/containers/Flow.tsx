import * as React from 'react';
const { useState } = React;

import Config from '../config';
import Post from '../components/Post';
import { Box } from 'react-bulma-components/full';

const fetchAll = async ({
  flowId,
  users,
  setUsers,
  posts,
  setPosts,
  setTimeoutID,
  setNextURL,
  nextURL
}) => {
  const response = await fetch(
    nextURL ? Config.api + nextURL : Config.api + '/flows/' + flowId
  ).then(r => r.json());
  setNextURL(response._links.next.href);
  const { users: rUsers, posts: rPosts } = response._embedded;
  const usersById = rUsers.reduce(
    (uBI, user) => ({ ...uBI, [user.id]: user }),
    {}
  );
  setUsers({ ...users, ...usersById });
  setPosts([...rPosts, ...posts].slice(0, 100));
  setTimeoutID(0);
};

export default ({ id: flowId = 'local' }: { id?: string }) => {
  const [users, setUsers] = useState({});
  const [posts, setPosts] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [timeoutID, setTimeoutID] = useState(0);

  if (!timeoutID) {
    const id = setTimeout(
      () =>
        fetchAll({
          flowId,
          users,
          setUsers,
          posts,
          setPosts,
          setTimeoutID,
          nextURL,
          setNextURL
        }),
      1000
    );
    setTimeoutID(id);
  }

  return (
    <Box>
      {posts.map(post => (
        <Post key={post.id} post={post} author={users[post.author]} />
      ))}
    </Box>
  );
};
