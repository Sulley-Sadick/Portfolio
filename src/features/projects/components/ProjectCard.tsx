import type { ComponentProps } from "react";
import { LuExternalLink } from "react-icons/lu";
import { SiGithub } from "react-icons/si";

import { PROJECT_CARD_MAX_VISIBLE_TAGS } from "../projects.constants";
import type { ProjectType } from "../projects.contract.types";
import { cn } from "../../../shared/utils/cn";
import { buttonVariants } from "../../../shared/ui/primitive/Button/components/Button";
import { Pill } from "../../../shared/ui/primitive/Button/Pill";
import { Image } from "../../../shared/ui/primitive/Image";

export type ProjectCardProps = ComponentProps<"li"> & ProjectType;

export function ProjectCard({
  imgSrc,
  tags,
  title,
  description,
  link,
  repo,
  categories: _categories,
  featured: _featured,
  id: _id,
  sortOrder: _sortOrder,
  className,
  ...props
}: ProjectCardProps) {
  return (
    <li
      className={cn(
        "group card-surface bg-muted hover:border-accent/30 hover:shadow-accent/5 grid transition-all hover:shadow-lg",
        className,
      )}
      {...props}
    >
      <div className="relative h-50 w-full shrink-0 overflow-hidden rounded-t-2xl">
        <Image
          url={imgSrc}
          alt={title}
          imageClassName="rounded-none object-cover object-top"
        />
      </div>

      <div className="grid grid-rows-[auto_auto_1fr_auto] px-4 pt-4 pb-4">
        <h3 className="mb-3 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-neutral-secondary mb-1 line-clamp-2 text-sm leading-relaxed">
          {description}
        </p>

        <ProjectTags tags={tags} />

        <ProjectLinks
          className="border-t-neutral-secondary/10 mt-4 border-t"
          link={link}
          repo={repo}
        />
      </div>
    </li>
  );
}

function ProjectLinks({
  link,
  repo,
  className,
  ...props
}: Pick<ProjectCardProps, "repo" | "link"> & ComponentProps<"div">) {
  const linkClass = cn(
    buttonVariants({ pad: "none", rad: "none", y: "center", variant: "none" }),
    "flex gap-x-1.5 outline-none",
  );

  if (!repo && !link) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-2 pt-4 text-[14px] tracking-wide",
        className,
      )}
      {...props}
    >
      {repo ? (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <SiGithub className="size-4" /> Repo
        </a>
      ) : null}

      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(linkClass, "text-accent")}
        >
          <LuExternalLink className="size-4" /> Live
        </a>
      ) : null}
    </div>
  );
}

function ProjectTags({ tags }: Pick<ProjectCardProps, "tags">) {
  const max = PROJECT_CARD_MAX_VISIBLE_TAGS;
  const hasMore = tags.length > max;
  const remaining = tags.length - max;

  return (
    <ul
      className="flex flex-wrap gap-2"
      aria-label="Frameworks, libraries, and tools used"
    >
      {tags.slice(0, max).map((tag) => (
        <li key={tag}>
          <Pill
            pad="sm"
            variant="ghost-light"
            rad="xs"
            className="cursor-auto text-xs whitespace-nowrap opacity-50 hover:opacity-100"
          >
            {tag}
          </Pill>
        </li>
      ))}

      {hasMore ? (
        <li>
          <Pill
            pad="sm"
            variant="ghost-light"
            rad="xs"
            className="cursor-auto text-[9px] whitespace-nowrap opacity-50"
          >
            +{remaining}
          </Pill>
        </li>
      ) : null}
    </ul>
  );
}
