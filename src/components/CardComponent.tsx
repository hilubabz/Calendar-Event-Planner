import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

const CardComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Events</CardTitle>
        <CardDescription>1 event today</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Go To Intern</p>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
