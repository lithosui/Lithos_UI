/**
 * @fileoverview Lithos UI DropdownSub primitive for nested menus.
 * - Instantiates a nested `Popover` configured with `right-start` placement by default.
 * - Leverages `useHover` with `safePolygon` to keep submenus open during diagonal cursor movements.
 * - Uses a custom trigger item that opens the nested surface on hover or focus without closing the root menu.
 */
import { useRef, useState, useMemo } from 'react'
import { Popover, PopoverTrigger } from '../Popover'
import { Button } from '../Button'
import {
  useFloatingNodeId,
  useFloatingParentNodeId,
  FloatingNode,
  useMergeRefs,
  useListItem,
  FloatingPortal,
  safePolygon,
} from '@floating-ui/react'
import { DropdownContent } from './DropdownContent'
import type { DropdownSubProps } from './dropdown.types'

import { menuItemClass } from './Dropdown'

/**
 * Nested submenu container component managing floating sub-panels and hover/focus triggers.
 *
 * @param props - Submenu configuration properties including triggers, placements, and disabled states. - {@link DropdownSubProps}
 * @returns Nested floating node submenu element.
 */
export const DropdownSub = ({ children, trigger, placement = 'right-start', disabled, ...props }: DropdownSubProps) => {
  const [open, setOpen] = useState(false)
  const { ref: listItemRef, index } = useListItem()
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const mergedRef = useMergeRefs([listItemRef, triggerRef])

  const nodeId = useFloatingNodeId()
  const parentId = useFloatingParentNodeId()

  const popoverProps = useMemo(
    () => ({
      open,
      onOpenChange: setOpen,
      placement,
      nodeId,
      focus: true,
      parentId,
      hover: {
        delay: { open: 300, close: 150 },
        restMs: 100,
        handleClose: safePolygon(),
      },
      ...props,
    }),
    [nodeId, open, parentId, placement, props]
  )

  const handleCloseSubmenu = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <FloatingNode id={nodeId}>
      <Popover {...popoverProps}>
        <PopoverTrigger asChild ref={mergedRef}>
          <Button
            variant="text"
            aria-haspopup="menu"
            role="menuitem"
            data-index={index}
            tabIndex={0}
            className={menuItemClass}
            disabled={disabled}
          >
            {trigger}
          </Button>
        </PopoverTrigger>

        {open && (
          <FloatingPortal>
            <DropdownContent onCloseSubmenu={handleCloseSubmenu}>{children}</DropdownContent>
          </FloatingPortal>
        )}
      </Popover>
    </FloatingNode>
  )
}
