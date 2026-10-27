import type { FetchStatus } from "./../../shared/utils/response/response.utils.types";

export type SocialMediaProps = {
  title: string;
  color: string;
  link: string;
  icon: React.ElementType;
};

export type ContactDataType = {
  name: string;
  message: string;
  contact: string;
  honeypot?: string | undefined;
};

export interface IContactService {
  socials: () => SocialMediaProps[];
  create: (props: ContactDataType) => Promise<FetchStatus>;
}
