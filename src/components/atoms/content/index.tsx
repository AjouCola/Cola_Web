import { Container } from './styles';

interface Props {
  title: string;
  kind: string;
  date: Date;
}

const Content = ({ title, kind, date }: Props) => {
  const getContentDate = (date: Date) =>
    `${date.getFullYear() % 100}/${date.getMonth() < 10 ? '0' : ''}${date.getMonth()}/${
      date.getDate() < 10 ? '0' : ''
    }${date.getDate()} ${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${
      date.getMinutes() < 10 ? '0' : ''
    }${date.getMinutes()}`;
  return (
    <Container>
      <p>{title}</p>
      <div>
        <p>{kind}</p>
        <p>{getContentDate(date)}</p>
      </div>
    </Container>
  );
};

export default Content;
