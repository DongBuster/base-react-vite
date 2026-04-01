import ErrorBoundary from "@shared/components/error-boundary/ErrorBoundary";
import { NetworkDetector } from "@shared/components/online-offline";
import { Alert, Button, Card, Divider, Space, Tag, Typography } from "antd";
import { useState } from "react";
import {
  ContentStack,
  InfoBlock,
  SecondaryParagraph,
  SectionStack,
  StatusRow,
  TestPageContainer,
} from "./test-debug-page.styles";

const { Title, Text, Paragraph } = Typography;

function BuggyCounter() {
  const [count, setCount] = useState(0);

  if (count === 3) {
    throw new Error(
      `Crash gia lap! count dat ${count} - ErrorBoundary da bat duoc loi nay.`
    );
  }

  return (
    <Space direction="vertical" size="small">
      <Text>
        So lan click: <Tag color="blue">{count}</Tag>
      </Text>
      <Text type="secondary">Bam du 3 lan de trigger crash</Text>
      <Button danger onClick={() => setCount((currentCount) => currentCount + 1)}>
        Click de crash ({count}/3)
      </Button>
    </Space>
  );
}

function ErrorBoundaryTestSection() {
  const [boundaryKey, setBoundaryKey] = useState(0);

  return (
    <Card
      title={
        <Space>
          <span>Test ErrorBoundary</span>
          <Tag color="green">Class Component</Tag>
        </Space>
      }
      extra={
        <Button size="small" onClick={() => setBoundaryKey((key) => key + 1)}>
          Reset boundary
        </Button>
      }
    >
      <InfoBlock>
        <Alert
          type="info"
          showIcon
          message="Cach hoat dong"
          description="BuggyCounter se throw error khi count = 3. ErrorBoundary se bat loi va hien thi UI fallback thay vi crash toan trang."
        />
      </InfoBlock>

      <ErrorBoundary key={boundaryKey}>
        <BuggyCounter />
      </ErrorBoundary>

      <Divider />

      <Title level={5}>Test voi custom fallback</Title>
      <ErrorBoundary
        key={boundaryKey + 1000}
        fallback={
          <Alert
            type="error"
            showIcon
            message="Custom Fallback UI"
            description="Day la fallback tuy chinh thay vi Result mac dinh cua ErrorBoundary."
          />
        }
      >
        <BuggyCounter />
      </ErrorBoundary>
    </Card>
  );
}

function NetworkTestSection() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const simulateOffline = () => {
    window.dispatchEvent(new Event("offline"));
    setIsOnline(false);

    setTimeout(() => {
      window.dispatchEvent(new Event("online"));
      setIsOnline(true);
    }, 4000);
  };

  const simulateOnline = () => {
    window.dispatchEvent(new Event("online"));
    setIsOnline(true);
  };

  return (
    <Card
      title={
        <Space>
          <span>Test NetworkDetector</span>
          <Tag color="purple">Browser Events</Tag>
        </Space>
      }
    >
      <InfoBlock>
        <Alert
          type="info"
          showIcon
          message="Cach hoat dong"
          description={
            <>
              <div>
                NetworkDetector lang nghe su kien <code>window.online</code> /{" "}
                <code>window.offline</code> cua trinh duyet.
              </div>
              <div>
                Nut ben duoi se <strong>dispatch su kien gia lap</strong> de
                NetworkDetector phat hien va hien notification.
              </div>
              <div>
                Hoac ban co the: <strong>F12 -&gt; Network tab -&gt; Offline</strong>{" "}
                de test thuc te.
              </div>
            </>
          }
        />
      </InfoBlock>

      <ContentStack>
        <StatusRow>
          <Text>Trang thai hien tai:</Text>
          <Tag color={isOnline ? "green" : "red"}>
            {isOnline ? "Online" : "Offline"}
          </Tag>
        </StatusRow>

        <Space wrap>
          <Button danger onClick={simulateOffline} disabled={!isOnline}>
            Gia lap mat mang (4 giay)
          </Button>
          <Button type="primary" onClick={simulateOnline} disabled={isOnline}>
            Gia lap co mang lai
          </Button>
        </Space>

        <SecondaryParagraph type="secondary">
          Sau khi bam &quot;Gia lap mat mang&quot;, hay de y goc duoi phai man
          hinh. Notification se xuat hien va sau 4 giay se tu online lai.
        </SecondaryParagraph>
      </ContentStack>

      <NetworkDetector />
    </Card>
  );
}

export default function TestDebugPage() {
  return (
    <TestPageContainer>
      <Title level={2}>Debug &amp; Test Page</Title>
      <Paragraph type="secondary">
        Trang nay chi dung de test cac component infrastructure. Xoa route khi
        khong can nua.
      </Paragraph>

      <InfoBlock>
        <Alert
          type="warning"
          showIcon
          message="Development Only"
          description="Trang nay chi dung trong moi truong phat trien. Hay xoa route /test-debug truoc khi deploy production."
        />
      </InfoBlock>

      <SectionStack>
        <ErrorBoundaryTestSection />
        <NetworkTestSection />
      </SectionStack>
    </TestPageContainer>
  );
}
