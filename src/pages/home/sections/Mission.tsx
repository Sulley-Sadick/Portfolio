import { AccentText } from "../../../shared/ui/primitive/AccentText";

export function Mission() {
  return (
    <div>
      <section className="section text-center">
        <h2 className="section__title flex justify-center gap-x-2">
          What <AccentText as="span">I can</AccentText> Help You
          <AccentText as="span">Achieve</AccentText>
        </h2>
        <p className="text-neutral-secondary mx-auto mt-8 max-w-3xl leading-relaxed">
          I build modern, responsive web applications that help businesses and
          brands establish a strong online presence. I focus on creating
          intuitive user interfaces, delivering smooth user experiences, and
          writing clean, maintainable code. From well-crafted websites to
          interactive web applications, my goal is to turn ideas into practical
          digital experiences that are accessible, performant, and built around
          the needs of real users.
        </p>
      </section>
    </div>
  );
}
