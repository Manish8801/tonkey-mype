
const Caret = () => {
  return (
    <div
      ref={caretRef}
      className={`${
        isFocused ? "block" : "hidden"
      } duration-100 delay-0 bg-content-main absolute h-10 w-[3.5px] ease-linear rounded-full`}
    />
  );
};

export default Caret;
