import Character from "./Character";

export default function App({ characters }) {
  return (
    <div className="flex p-3 space-x-3">
      {characters.map(props => (
        <Character
          key={props.name}
          {...props}
        />
      ))}
    </div>
  );
}
