const MultiStepProgress = ({ updates }) => {
  return (
    <>
      <ol class="relative text-gray-500 border-s border-gray-200">
        {updates.map((item) => (
          <li class="mb-10 ms-6">
            <span class="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white">
              {item.description}
            </span>
            <h3 class="font-medium leading-tight">Personal Info</h3>
            <p class="text-sm">Step details here</p>
          </li>
        ))}
      </ol>
    </>
  );
};
