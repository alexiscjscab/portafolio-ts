import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const TextAbout = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #fafafa;
  max-width: 600px;
  margin: 0 auto;
  @media (max-width: 300px) {
    display: none;
  }
`;

export const TextAboutMe = () => {
  const { t } = useTranslation();

  return (
    <TextAbout>
      {t('aboutMeText')}
    </TextAbout>
  );
};
