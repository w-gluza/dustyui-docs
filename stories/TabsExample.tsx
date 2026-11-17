import type { ReactNode } from "react";
import {
  ProgressBar,
  StatList,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type TabsProps,
} from "dustyui";
import styles from "./Tabs.module.css";

type ExampleProps = Omit<TabsProps, "value" | "defaultValue" | "children"> & {
  value?: string;
  disabledTab?: string;
  labels?: Partial<Record<"overview" | "activity" | "settings", string>>;
};

const STORAGE = { used: 31, total: 50 };

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.panel}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export function AccountTabs({
  value,
  disabledTab,
  labels = {},
  ...props
}: ExampleProps) {
  const state = value === undefined ? { defaultValue: "overview" } : { value };

  return (
    <Tabs {...props} {...state}>
      <TabsList label="Account settings">
        <TabsTrigger value="overview" disabled={disabledTab === "overview"}>
          {labels.overview ?? "Overview"}
        </TabsTrigger>
        <TabsTrigger value="activity" disabled={disabledTab === "activity"}>
          {labels.activity ?? "Activity"}
        </TabsTrigger>
        <TabsTrigger value="settings" disabled={disabledTab === "settings"}>
          {labels.settings ?? "Settings"}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Panel title="Studio plan">
          <p>Your plan renews on 1 December.</p>
          <div className={styles.meter}>
            <p className={styles.meterHeader} aria-hidden="true">
              <span className={styles.meterLabel}>Storage used</span>
              <span className={styles.meterValue}>
                {STORAGE.used} / {STORAGE.total} GB
              </span>
            </p>
            <ProgressBar
              label="Storage used"
              value={STORAGE.used}
              max={STORAGE.total}
              valueLabel={`${String(STORAGE.used)} of ${String(STORAGE.total)} GB`}
              startLabel={`${String(Math.round((STORAGE.used / STORAGE.total) * 100))}% of available storage`}
              endLabel={`${String(STORAGE.total - STORAGE.used)} GB remaining`}
            />
          </div>
        </Panel>
      </TabsContent>
      <TabsContent value="activity">
        <Panel title="This month">
          <StatList
            stats={[
              { label: "Projects published", value: 4 },
              { label: "Files uploaded", value: 128 },
              { label: "Last sign-in", value: "Today, 09:14" },
            ]}
          />
        </Panel>
      </TabsContent>
      <TabsContent value="settings">
        <Panel title="Notifications">
          <p>
            Weekly summaries arrive on Monday morning. Security alerts are
            always sent, whatever you choose here.
          </p>
        </Panel>
      </TabsContent>
    </Tabs>
  );
}
