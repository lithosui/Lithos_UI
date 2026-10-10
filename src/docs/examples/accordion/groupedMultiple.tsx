import { AccordionGroup, Accordion } from '../../../components/ui/Accordion'

export const GroupedMultiple = () => {
  return (
    <AccordionGroup defaultActive={['faq-1', 'faq-3']} allowMultiple>
      <Accordion title="Is Lithos UI really free forever?" value="faq-1">
        Yes. Absolutely free, forever. There is no paid tier, no 'Pro' version, and no locked features. The entire
        architecture and all components are open-source.
      </Accordion>
      <Accordion title="Is this just a fork of shadcn/ui?" value="faq-2">
        No. Lithos UI is a wholly original architecture. While it shares the philosophy of copy-paste components, it is
        built on its own foundation: the Zero-Gap layout system, an automated YIQ contrast engine, and universal
        specificity overrides. It is engineered from scratch for structural stability, not cloned.
      </Accordion>
      <Accordion title="What is the Zero-Gap rule?" value="faq-3">
        The Zero-Gap layout system means we strictly avoid CSS `gap` utilities for core layouts. Instead, we use
        explicit mathematically proportional margins to ensure perfect geometric stacking and rendering predictability
        across all viewports without flex/grid wrapping failures.
      </Accordion>
    </AccordionGroup>
  )
}
