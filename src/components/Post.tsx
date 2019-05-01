import * as React from 'react';
import { Media, Content, Image } from 'react-bulma-components/full';
import placeholder from '../02_02_07.png';

export default function Post({ post, author }: { post: any; author: any }) {
  const { handle } = author;
  const { text, createdAt } = post;

  return (
    <Media>
      <Media.Item renderAs="figure" position="left">
        <Image size={64} src={placeholder} />
      </Media.Item>
      <Media.Item>
        <Content>
          <p className="p-fit">
            @{handle}
            <small className="is-pulled-right">
              <time dateTime={createdAt}>{createdAt}</time>
            </small>
          </p>
          <p>{text}</p>
        </Content>
      </Media.Item>
    </Media>
  );
}
