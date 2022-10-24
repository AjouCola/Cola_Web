import { useState } from 'react';

import { useRouter } from 'next/router';

import PolicySection from '@components/molecules/section/PolicySection';
import { policyDummy1, policyDummy2 } from '@constants/singupPolicy';
import { Container, Title, PolicyWrapper, NextBtn } from '@styles/signUp/policy';

const SignUpPolicy = () => {
  const router = useRouter();
  const [policy1, setPolicy1] = useState(false);
  const [policy2, setPolicy2] = useState(false);

  return (
    <Container>
      <Title>SIGN UP</Title>
      <PolicyWrapper>
        <PolicySection
          checked={policy1}
          setCheck={setPolicy1}
          checkboxId="singup-policy1"
          policyTitle={policyDummy1.title}
          policyContent={policyDummy1.content}
          checkboxLabel="[필수] 이용약관에 동의하였으며 약관에 동의합니다"
        />
        <PolicySection
          checked={policy2}
          setCheck={setPolicy2}
          checkboxId="singup-policy2"
          policyTitle={policyDummy2.title}
          policyContent={policyDummy2.content}
          checkboxLabel="[필수] 개인정보처리방침을 확인했으며 개인정보수집 및 이용에 동의합니다"
        />
      </PolicyWrapper>
      <NextBtn onClick={() => policy1 && policy2 && router.push('/signUp')}>NEXT</NextBtn>
    </Container>
  );
};
export default SignUpPolicy;
