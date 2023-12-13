import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

const CardTitle = ({ title, disableBack = false, onBack }) => {
  return (
    <Container>
      <Action>
        {!disableBack && (
          <BackButton
            type="primary"
            ghost
            shape="circle"
            icon={<LeftOutlined />}
            onClick={onBack}
          />
        )}
      </Action>
      <Title>{title}</Title>
      <Action></Action>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 6px;
`;

const Action = styled.div`
  flex: 0 0 32px;
`;

const Title = styled.span``;

const BackButton = styled(Button)`
  color: #5e17eb !important;
  border: 1px solid #5e17eb !important;
`;

export default CardTitle;
