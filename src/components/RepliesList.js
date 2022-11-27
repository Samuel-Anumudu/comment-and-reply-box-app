import RepliesItem from "./RepliesItem";
function RepliesList({ replies }) {
  return (
    <>
      <article className="sm:w-9/12  mx-auto pl-[3.275rem]">
        <div className="flex items-stretch justify-between gap-10">
          <div className="reply__custom-line lg:h-auto lg:w-[2px] bg-[var(--light-gray)]"></div>
          <div className="flex flex-col gap-6">
            {replies.map((reply) => (
              <RepliesItem key={reply.id} reply={reply} />
            ))}
          </div>
        </div>
      </article>
    </>
  );
}

export default RepliesList;
