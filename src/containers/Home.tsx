import * as React from 'react';
import {
  Media,
  Content,
  Columns,
  Card,
  Button,
  Heading,
  Image
} from 'react-bulma-components/full';
import placeholder from '../02_02_07.png';

import Flow from './Flow';

export default function Home() {
  return (
    <div className="container-p">
      <Columns>
        <Columns.Column size="one-third">
          <Card>
            <Card.Content>
              <Media>
                <Media.Item renderAs="figure" position="left">
                  <Image size={64} src={placeholder} />
                </Media.Item>
                <Media.Item>
                  <Heading size={5}>Test</Heading>
                  <Heading subtitle size={6}>
                    @test
                  </Heading>
                </Media.Item>
              </Media>
              <Content>
                <form className="field">
                  <div className="control is-expanded">
                    <textarea className="textarea" placeholder="What's up?" />
                  </div>
                  <div className="control is-expanded">
                    <Button className="button is-info" type="submit">
                      投げ込む
                    </Button>
                  </div>
                </form>
              </Content>
            </Card.Content>
          </Card>
        </Columns.Column>
        <Columns.Column size="two-thirds">
          <Flow />
        </Columns.Column>
      </Columns>
    </div>
  );
}
