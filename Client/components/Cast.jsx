function Cast({ source, name }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <img
        src={source}
        className="rounded-full h-20 w-20
      object-center
      "
      />
      <p className="font-light ">{name}</p>
    </div>
  );
}

export default Cast;
