const SideTabs = ({ listOptions, setChoice, choice, className }) => {
  return (
    <div class={` ${className} text-sm font-medium text-center text-gray-500 border-b border-gray-200`}>
      <ul class="flex flex-wrap -mb-px">
        {listOptions.map((option) => (
          <li key={option.code} class="me-2">
            <a
              class={` ${
                choice === option.code && 'text-blue-500 border-blue-500 active'
              }  inline-block p-4 border-b-2 ${
                choice !== option.code && 'border-transparent'
              } rounded-t-lg hover:border-gray-300 cursor-pointer `}
              onClick={() => setChoice(option.code)}
            >
              {option.description}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideTabs;
