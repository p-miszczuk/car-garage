"use client";

import { useState } from "react";
import TabsView from "./tabs-view";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { GET_VEHICLE_HISTORY_URL } from "@/components/vehicles-details/vehicle-details-list";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/utils";

interface TabsContainerProps {
  tabs: { label: string; value: string }[];
  type: "vehicle-details";
  children: React.ReactNode;
  mutate?: () => void;
}

const TabsContainer = ({
  children,
  tabs = [],
  type,
  mutate,
}: TabsContainerProps) => {
  const router = useRouter();
  const { vehicleId } = useParams();
  const searchParams = useSearchParams();
  const activeElement = searchParams.get("type") || tabs[0].value;
  const [activeTab, setActiveTab] = useState<string>(activeElement);

  const handleActiveTab = (value: string) => {
    setActiveTab(value);
    router.push(`/vehicles/my-vehicles/${vehicleId}?type=${value}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1 justify-center">
        {tabs.map(({ label, value }) => (
          <TabsView
            key={value}
            activeTab={activeTab}
            value={value}
            label={label}
            setActiveTab={handleActiveTab}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-row gap-4 justify-center">{children}</div>
    </div>
  );
};

export default TabsContainer;
