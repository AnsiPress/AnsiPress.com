import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";

type Props = {
  name: string;
  email: string;
  company?: string;
  website?: string;
  useCase?: string;
  message: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referralSource?: string;
};

export function EnterpriseContactEmail(props: Props) {
  const { name, email, company, website, useCase, message, utmSource, utmMedium, utmCampaign, referralSource } = props;
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#000", color: "#fff" }}>
        <Container style={{ padding: "24px" }}>
          <Heading style={{ color: "#fff" }}>New Enterprise Contact</Heading>
          <Text>Name: {name}</Text>
          <Text>Email: {email}</Text>
          {company && <Text>Company: {company}</Text>}
          {website && <Text>Website: {website}</Text>}
          {useCase && <Text>Use Case: {useCase}</Text>}
          <Text>Message:</Text>
          <Text>{message}</Text>
          <Text>Tracking:</Text>
          {utmSource && <Text>utm_source: {utmSource}</Text>}
          {utmMedium && <Text>utm_medium: {utmMedium}</Text>}
          {utmCampaign && <Text>utm_campaign: {utmCampaign}</Text>}
          {referralSource && <Text>ref: {referralSource}</Text>}
        </Container>
      </Body>
    </Html>
  );
}
