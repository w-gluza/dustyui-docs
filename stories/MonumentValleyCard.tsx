import {
  Avatar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardMedia,
  CardTitle,
  type CardProps,
  type CardTitleLevel,
} from "dustyui";
import { DesertLandscape, DesertPortrait } from "./DesertArtwork";
import styles from "./Card.module.css";

export const AUTHOR = "Wioletta Gluza";
export const TITLE = "Monument Valley";
export const DESCRIPTION =
  "Sandstone buttes rising 300 metres from the desert floor on the Arizona-Utah border, in the heart of the Navajo Nation.";

export function Author() {
  return (
    <>
      <Avatar
        name={AUTHOR}
        size={44}
        ring="neutral"
        decorative
        image={<DesertPortrait />}
      />
      <span className={styles.author}>{AUTHOR}</span>
    </>
  );
}

interface MonumentValleyCardProps extends CardProps {
  titleLevel?: CardTitleLevel | undefined;
}

export function MonumentValleyCard({
  titleLevel = 2,
  ...props
}: MonumentValleyCardProps) {
  return (
    <Card {...props}>
      <CardMedia label="Featured">
        <DesertLandscape />
      </CardMedia>
      <CardContent>
        <CardTitle level={titleLevel}>{TITLE}</CardTitle>
        <CardDescription>{DESCRIPTION}</CardDescription>
        <CardFooter end="6 min read">
          <Author />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
