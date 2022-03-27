import React, { useEffect } from "react";
import { AbxTrackItem } from "./AbxListContainers/trackListReducer";
import useTrackList from "./AbxListContainers/useTrackList";

type LayoutProps = {
  children: any;
};

const data = [
  {
    id: 1,
    index: 0,
    isRemoved: false,
    data: {},
  },
  {
    id: 2,
    index: 1,
    isRemoved: false,
    data: {},
  },
  {
    id: 3,
    index: 2,
    isRemoved: false,
    data: {},
  },
];

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const {
    sourceResult,
    destinationResult,
    dirtyResult,
    loadLists,
    moveToSource,
    moveToDestination,
    reorder,
  } = useTrackList<any>({ source: [], destination: [] });

  useEffect(() => {
    loadLists(data, []);
  }, []);

  return (
    <div>
      <div>
        <h2>Source</h2>
        <ul>
          {sourceResult.map((item: AbxTrackItem<any>) => (
            <li key={item.id}>
              {item.id} {JSON.stringify(item.isRemoved)}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Destination</h2>
        <ul>
          {destinationResult.map((item: AbxTrackItem<any>) => (
            <li key={item.id}>{item.id}</li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={() => moveToSource(1)}>move to source</button>
        <button onClick={() => moveToDestination(1)}>
          move to destination
        </button>
        <button onClick={() => reorder("source", 0, 2)}>Reorder</button>
        <button onClick={() => loadLists(data, [])}>Load data</button>
      </div>

      <div>
        <h2>{JSON.stringify(dirtyResult)}</h2>
      </div>
    </div>
  );
};
