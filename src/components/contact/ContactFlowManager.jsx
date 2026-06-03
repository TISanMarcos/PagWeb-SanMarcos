import { useAppStore } from '../../store/useAppStore';
import { useContactFlow } from '../../hooks/useContactFlow';
import UserTypeModal from './UserTypeModal';
import RetailIntentModal from './RetailIntentModal';
import ChangeProfileModal from './ChangeProfileModal';
import BusinessLeadModal from './BusinessLeadModal';
import ThankYouModal from './ThankYouModal';

const ContactFlowManager = () => {
  const contactModal = useAppStore((s) => s.contactModal);
  const thankYouModal = useAppStore((s) => s.thankYouModal);
  const closeThankYouModal = useAppStore((s) => s.closeThankYouModal);
  const userProfile = useAppStore((s) => s.userProfile);
  const setContactModal = useAppStore((s) => s.setContactModal);
  const setPendingContact = useAppStore((s) => s.setPendingContact);
  const clearUserProfile = useAppStore((s) => s.clearUserProfile);
  const { completeTypeSelection, completeRetailIntent, closeBusinessForm } = useContactFlow();

  const handleCloseTypeModal = () => {
    setContactModal(null);
    setPendingContact(null);
  };

  const thankYouOverlay = thankYouModal ? (
    <ThankYouModal variant={thankYouModal} onClose={closeThankYouModal} />
  ) : null;

  if (contactModal === 'select-type') {
    return (
      <>
        <UserTypeModal
          onClose={handleCloseTypeModal}
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
          defaultIntent={userProfile?.intent ?? ''}
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
            setContactModal('select-type');
          }}
        />
        {thankYouOverlay}
      </>
    );
  }

  return thankYouOverlay;
};

export default ContactFlowManager;
