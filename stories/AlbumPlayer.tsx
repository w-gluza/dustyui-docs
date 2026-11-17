import { useState, type ReactNode } from "react";
import {
  ExpandableCard,
  PlaybackControls,
  RecordSleeve,
  TrackList,
  type HeadingLevel,
  type Track,
} from "dustyui";
import styles from "./Media.module.css";

export interface Album {
  title: string;
  artist: string;
  meta: string;
  note: string;
  tracks: readonly Track[];
}

export const HELIOS: Album = {
  title: "Helios",
  artist: "Maya Chen",
  meta: "2026 - Ambient - 38 min",
  note: "Recorded over one winter with a single synthesiser and a tape machine.",
  tracks: [
    { title: "Dawn Static", duration: "3:42" },
    { title: "Soft Transit", duration: "4:15" },
    { title: "Glass Fields", duration: "5:08" },
    { title: "Low Sun", duration: "6:21" },
  ],
};

interface AlbumPlayerProps {
  album: Album;
  artwork: ReactNode;
  level: HeadingLevel;
  defaultExpanded?: boolean;
  defaultPlaying?: boolean;
  defaultTrack?: number;
}

export function AlbumPlayer({
  album,
  artwork,
  level,
  defaultExpanded = false,
  defaultPlaying = false,
  defaultTrack = 0,
}: AlbumPlayerProps) {
  const [playing, setPlaying] = useState(defaultPlaying);
  const [track, setTrack] = useState(defaultTrack);
  const lastTrack = album.tracks.length - 1;

  return (
    <ExpandableCard
      title={album.title}
      level={level}
      defaultExpanded={defaultExpanded}
      media={<RecordSleeve artwork={artwork} />}
      expandedMedia={
        <RecordSleeve artwork={artwork} revealed playing={playing} />
      }
      summary={
        <>
          <span className={styles.artist}>{album.artist}</span>
          <span className={styles.meta}>{album.meta}</span>
        </>
      }
    >
      <PlaybackControls
        className={styles.controls}
        playing={playing}
        progress={0.35}
        onPlayingChange={setPlaying}
        onPrevious={
          track > 0
            ? () => {
                setTrack(track - 1);
              }
            : undefined
        }
        onNext={
          track < lastTrack
            ? () => {
                setTrack(track + 1);
              }
            : undefined
        }
      />
      <TrackList
        label="Tracks"
        tracks={album.tracks}
        currentTrack={track}
        onTrackSelect={(index) => {
          setTrack(index);
          setPlaying(true);
        }}
      />
      <p className={styles.note}>{album.note}</p>
    </ExpandableCard>
  );
}
