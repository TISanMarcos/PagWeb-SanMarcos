import { useAppStore } from '../../store/useAppStore';
import { useContactFlow } from '../../hooks/useContactFlow';
import AudienceModal from './AudienceModal';
import BusinessTypeModal from './BusinessTypeModal';
import RetailIntentModal from './RetailIntentModal';
import ChangeProfileModal from './ChangeProfileModal';
import BusinessLeadModal from './BusinessLeadModal';
import ThankYouModal from './ThankYouModal';

const ContactFlowManager = () => {
  const contactModal = useAppStore((s) => s.contactModal);
  const thankYouModal = useAppStore((s) => s.thankYouModal);
  const closeThankYouModal = useAppStore((s) => s.closeThankYouModal);
  const pendingContact = useAppStore((s) => s.pendingContact);
  const userProfile = useAppStore((s) => s.userProfile);
  const setContactModal = useAppStore((s) => s.setContactModal);
  const setPendingContact = useAppStore((s) => s.setPendingContact);
  const clearUserProfile = useAppStore((s) => s.clearUserProfile);
  const {
    completeAudienceSelection,
    completeTypeSelection,
    completeRetailIntent,
    closeBusinessForm,
    backToAudience,
  } = useContactFlow();

  const handleCloseTypeModal = () => {
    setContactModal(null);
    setPendingContact(null);
  };

  const thankYouOverlay = thankYouModal ? (
    <ThankYouModal variant={thankYouModal} onClose={closeThankYouModal} />
  ) : null;

  if (contactModal === 'select-audience') {
    return (
      <>
        <AudienceModal
          onClose={handleCloseTypeModal}
          onSelect={completeAudienceSelection}
        />
        {thankYouOverlay}
      </>
    );
  }

  if (contactModal === 'select-business-type') {
    return (
      <>
        <BusinessTypeModal
          onClose={handleCloseTypeModal}
          onBack={backToAudience}
          onSelect={(typeId) => completeTypeSelection(typeId)}
        />
        {thankYouOverlay}
      </>
    );
  }

  if (contactModal === 'retail-intent') {
    return (
      <>
        <RetailIntentModal
          defaultIntent={userProfile?.intent ?? pendingContact?.intent ?? ''}
          defaultPetName={userProfile?.petName ?? ''}
          action={pendingContact?.action ?? 'cotizar'}
          showIntent={!pendingContact?.intent?.trim()}
          onClose={handleCloseTypeModal}
          onContinue={completeRetailIntent}
        />
        {thankYouOverlay}
      </>
    );
  }

  if (contactModal === 'business-form') {
    return (
      <>
        <BusinessLeadModal onClose={closeBusinessForm} />
        {thankYouOverlay}
      </>
    );
  }

  if (contactModal === 'change-confirm') {
    return (
      <>
        <ChangeProfileModal
          currentLabel={userProfile?.label ?? '—'}
          onCancel={() => setContactModal(null)}
          onConfirm={() => {
            clearUserProfile();
            setContactModal('select-audience');
          }}
        />
        {thankYouOverlay}
      </>
    );
  }

  return thankYouOverlay;
};

export default ContactFlowManager;
