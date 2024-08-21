const Recommendations = ({ recommendations }) => (
  <div className="recommendations">
    <h2>Recommendations</h2>
    <ul className="text-xs text-muted-foreground">
      {recommendations.map((rec, index) => (
        <li key={index}>{rec}</li>
      ))}
    </ul>
  </div>
);

export default Recommendations;
