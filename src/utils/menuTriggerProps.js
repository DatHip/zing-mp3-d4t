// Several header/player menus use a <div> as their trigger. A bare div gets no
// role, no keyboard activation and no accessible name, so Tippy's own
// aria-expanded lands on an element that is not allowed to carry it — that is
// the aria-allowed-attr failure. Each call site disables Tippy's aria and
// spreads these props onto the real trigger instead, which gives the div the
// full button contract.
const menuTriggerProps = ({ expanded, onToggle, label, haspopup = "menu" }) => ({
   role: "button",
   tabIndex: 0,
   "aria-haspopup": haspopup,
   "aria-expanded": expanded,
   "aria-label": label,
   onClick: onToggle,
   onKeyDown: (e) => {
      // Space and Enter are what a native button responds to; Space also has to
      // be prevented or it scrolls the page.
      if (e.key !== "Enter" && e.key !== " ") return
      e.preventDefault()
      onToggle()
   },
})

export default menuTriggerProps
