import { useCommunityModal } from './useCommunityModal'
import NewsletterRow from './NewsletterRow'
import CommunityRow from './CommunityRow'
import CommunityModal from './CommunityModal'

export default function LandingCommunity() {
  const { open, openModal, closeModal, onTouchStart, onTouchEnd } = useCommunityModal()

  return (
    <section id="community">
      <NewsletterRow />
      <CommunityRow onJoinClick={openModal} />
      <CommunityModal
        open={open}
        onClose={closeModal}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />
    </section>
  )
}