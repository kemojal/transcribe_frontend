import { Card, CardContent } from "../ui/card";

const EmptyTabs = ({ title, description, ...props }) => {
  return (
    <div className="flex flex-col h-full min-h-[660px] items-center justify-center">
      <Card className="w-full max-w-md mx-auto shadow-none border-none">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center border-none">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyTabs;
