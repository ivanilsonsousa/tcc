import { Skeleton } from "@/components/ui/skeleton";

const SkeletonNestedCheckboxList = () => {
  return (
    <div>
      <Skeleton className="h-5 w-5/6 mb-4" />
      
      <div className="ml-4">
        <Skeleton className="h-5 w-4/6 mb-3" />
          <div className="ml-8">
            <Skeleton className="h-5 w-6/6 mb-2" />
            <Skeleton className="h-5 w-5/6 mb-2" />
            <Skeleton className="h-5 w-4/6 mb-2" />
          </div>

        <Skeleton className="h-5 w-3/6 mb-3" />
          <div className="ml-8">
            <Skeleton className="h-5 w-6/6 mb-2" />
            <Skeleton className="h-5 w-5/6 mb-2" />
            <Skeleton className="h-5 w-4/6 mb-2" />
          </div>

        <Skeleton className="h-5 w-3/6 mb-3" />
          <div className="ml-8">
            <Skeleton className="h-5 w-4/6 mb-2" />
            <Skeleton className="h-5 w-2/6 mb-2" />
          </div>
      </div>
    </div>
  );
};

export default SkeletonNestedCheckboxList;