import SectionWrapper from "@/src/components/SectionWrapper";

export default function ProductDetailLoading() {
  return (
    <div className="animate-pulse">
      <SectionWrapper className="pb-2 pt-30 md:pt-34">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="h-10 w-40 rounded-full bg-[#7bbf42]/20"></div>
          <div className="h-8 w-48 rounded-full bg-[#7bbf42]/20"></div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0 md:pt-0">
        <div className="rounded-4xl border border-[#7bbf42]/10 bg-[#f2f2eb] p-6 md:p-8 lg:p-10">
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:gap-10">
            <div className="h-110 w-full rounded-4xl bg-[#dbe7c7]"></div>
            <div className="flex flex-col pt-4">
              <div className="h-6 w-32 rounded-full bg-[#7bbf42]/20"></div>
              <div className="mt-5 h-12 w-3/4 rounded-xl bg-[#7bbf42]/20"></div>
              <div className="mt-4 h-12 w-2/3 rounded-xl bg-[#7bbf42]/20"></div>
              <div className="mt-6 h-12 w-24 rounded-full bg-[#7bbf42]/20"></div>

              <div className="mt-8 h-40 w-full rounded-[1.75rem] bg-[#dbe7c7]/50"></div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pb-8 pt-10 md:pt-12">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="h-96 rounded-[1.75rem] border border-[#7bbf42]/10 bg-[#f2f2eb] p-6"></div>
          <div className="space-y-6">
            <div className="h-48 rounded-[1.75rem] border border-[#7bbf42]/10 bg-[#f2f2eb] p-6"></div>
            <div className="h-48 rounded-[1.75rem] border border-[#7bbf42]/10 bg-[#f2f2eb] p-6"></div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
