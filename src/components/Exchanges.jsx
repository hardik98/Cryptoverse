import React from "react";
import { useGetExchangesQuery } from "../services/cryptoApi";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import millify from "millify";
import Loader from "./Loader";

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const { Text } = Typography;
  const { Panel } = Collapse;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume BTC</Col>
        <Col span={6}>Trust Score Rank</Col>
        <Col span={6}>Established Year</Col>
      </Row>
      <Row>
        {data.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id} style={{ width: "100%" }}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.trust_score_rank}.</strong>
                      </Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>
                      ${millify(exchange.trade_volume_24h_btc)}
                    </Col>
                    <Col span={6}>{exchange.trust_score_rank}</Col>
                    <Col span={6}>{exchange.year_established}</Col>
                  </Row>
                }
              >
                {exchange.description || "No Description Found"}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
