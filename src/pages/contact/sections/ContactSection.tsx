import type { ComponentProps } from "react";
import { HiPaperAirplane } from "react-icons/hi2";

import { useContact } from "../../../shared/hooks/useContact";
import { cn } from "../../../shared/utils/cn";
import { useTyping } from "../../../shared/hooks/useTyping";
import { AccentText } from "../../../shared/ui/primitive/AccentText";
import { FramerAnimatePosition } from "../../../shared/ui/Framer/components/FramerAnimatePosition";
import { formButtonVariants, formSectionVariants } from "./constants";
import { Label } from "../../../shared/ui/primitive/Label";
import { Input } from "../../../shared/ui/primitive/Input";
import { FeedbackCard } from "../../../shared/ui/primitive/FeedbackCard";
import { Textarea } from "../../../shared/ui/primitive/Textarea/Textarea";
import { Button } from "../../../shared/ui/primitive/Button/components/Button";
import { LoadingSwap } from "../../../shared/ui/primitive/LoadingSwap";

export function ContactSection({
  className,
  ...props
}: ComponentProps<"form">) {
  const {
    onSubmit,
    register,
    isLoading,
    formState: { message, error, success },
  } = useContact();

  const { output: contentHead, ref: refHead } = useTyping({
    text: "Send a direct",
    whileInView: true,
    speedInSeconds: 0.4,
  });

  const { output: contentTail, ref: refTail } = useTyping({
    text: " message",
    whileInView: true,
    speedInSeconds: 0.65,
  });

  return (
    <form
      className={cn("h-fit w-full py-0", className)}
      onSubmit={onSubmit}
      {...props}
    >
      <section className="flex w-full flex-col px-0 py-0">
        <h3
          ref={(ref) => {
            refHead(ref);
            refTail(ref);
          }}
          title="Send me a direct message"
          className="h-10 text-2xl font-bold"
        >
          <AccentText as="span">{contentHead}</AccentText>
          {contentTail}
        </h3>

        {message && (
          <FeedbackCard success={success} error={error}>
            {message}
          </FeedbackCard>
        )}
        <FramerAnimatePosition
          initial="hidden"
          animate="show"
          variants={formSectionVariants}
          className="flex flex-col gap-6"
        >
          <Label.Wrapper>
            <Label.Title>Name</Label.Title>
            <Input {...register("name")} placeholder="Enter your name" />
          </Label.Wrapper>

          <Label.Wrapper>
            <Label.Title>Email / Phone Number</Label.Title>
            <Input
              {...register("contact")}
              placeholder="Enter your email address / phone number"
            />
          </Label.Wrapper>

          <Label.Wrapper>
            <Label.Title>Message</Label.Title>
            <Textarea
              {...register("message")}
              className="h-25 resize-none"
              placeholder="Your message"
            />
          </Label.Wrapper>
          <Input hidden {...register("honeypot")} autoComplete="off" />
        </FramerAnimatePosition>
        <FramerAnimatePosition animate="show" variants={formButtonVariants}>
          <Button
            type="submit"
            disabled={isLoading}
            x="center"
            y="center"
            w="full"
            pad="lg"
            variant="accent"
            className="group hover:bg-accent-hover mt-4 flex gap-x-1.5 font-bold"
          >
            <LoadingSwap isLoading={isLoading}>
              Send Message
              <HiPaperAirplane className="size-4" />
            </LoadingSwap>
          </Button>
        </FramerAnimatePosition>
      </section>
    </form>
  );
}
