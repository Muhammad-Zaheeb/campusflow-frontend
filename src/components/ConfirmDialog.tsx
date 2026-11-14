import Modal from "./Modal"

type Props = {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  busy?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ open, title, message, confirmLabel = "Delete", busy, onConfirm, onCancel }: Props) {
  return (
    <Modal open={open} title={title} onClose={onCancel} size="sm">
      <p className="text-pencil">{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button type="button" className="btn-secondary" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button type="button" className="btn-danger" onClick={onConfirm} disabled={busy} autoFocus>
          {busy ? "Deleting…" : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
