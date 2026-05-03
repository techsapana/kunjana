import SectionWrapper from "@/src/components/SectionWrapper";

export default function ProductsLoading() {
  return (
    <div className="animate-pulse">
      <SectionWrapper className="pb-8 pt-30 md:pt-34">
        <div className="soft-panel p-8 md:p-10">
          <div className="h-6 w-24 rounded-full bg-[#7bbf42]/20"></div>
          <div className="mt-4 h-10 w-3/4 max-w-md rounded-xl bg-[#7bbf42]/20"></div>
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full max-w-2xl rounded bg-[#7bbf42]/10"></div>
            <div className="h-4 w-5/6 max-w-2xl rounded bg-[#7bbf42]/10"></div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-10 md:py-14">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-4xl border border-[#7bbf42]/10 bg-[#f2f2eb]"
            >
              <div className="h-48 sm:h-52 w-full bg-[#dbe7c7]"></div>
              <div className="flex flex-1 flex-col bg-[#fdfdfc] p-4 sm:p-5 md:p-6">
                <div className="h-8 w-3/4 rounded-xl bg-[#7bbf42]/20"></div>
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-full rounded bg-[#7bbf42]/10"></div>
                  <div className="h-4 w-5/6 rounded bg-[#7bbf42]/10"></div>
                </div>
                <div className="mt-auto pt-6 flex flex-col gap-2">
                  <div className="h-4 w-20 rounded bg-[#7bbf42]/20"></div>
                  <div className="h-10 w-full rounded-full border-2 border-[#7bbf42]/20 bg-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
