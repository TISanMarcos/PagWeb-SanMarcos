import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { isRetailUser } from '../constants/userTypes';
import { whatsAppUrl } from '../constants/whatsapp';
import { buildRetailWhatsAppMessage } from '../utils/buildContactMessage';

/**
 * @param {'cotizar'|'catalogo'|'registro'} action
 * @param {{ intent?: string, source?: string, productName?: string }} options
 */
export const useContactFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userProfile,
    pendingContact,
    setPendingContact,
    setContactModal,
    updateProfileIntent,
    updatePetName,
  } = useAppStore();

  const runAction = useCallback(
    (action, options = {}) => {
      const profile = useAppStore.getState().userProfile;
      if (!profile) return;

      const intent = options.intent ?? profile.intent ?? '';
      const source = options.source ?? location.pathname;
      const productName = options.productName;

      if (isRetailUser(profile.typeId)) {
        if (action === 'catalogo') {
          navigate('/catalog');
          return;
        }

        const message = buildRetailWhatsAppMessage({
          profile,
          intent,
          productName,
        });
        window.open(whatsAppUrl(message), '_blank', 'noopener,noreferrer');
        useAppStore.getState().showThankYouModal('retail');
        return;
      }

      if (action === 'catalogo') {
        navigate('/catalog');
      }
    },
    [location.pathname, navigate],
  );

  const startContactFlow = useCallback(
    (action, options = {}) => {
      const payload = {
        action,
        intent: options.intent ?? '',
        source: options.source ?? location.pathname,
        productName: options.productName,
      };

      setPendingContact(payload);
      setContactModal('select-audience');
    },
    [location.pathname, setPendingContact, setContactModal],
  );

  const completeAudienceSelection = useCallback(
    (audience) => {
      const pending = pendingContact ?? useAppStore.getState().pendingContact;
      if (!pending) return;

      if (audience === 'retail') {
        useAppStore.getState().setUserProfile('consumidor_final');
        setContactModal('retail-intent');
        return;
      }

      if (pending.action === 'catalogo') {
        setContactModal('select-business-type');
        return;
      }

      setContactModal('business-form');
    },
    [pendingContact, setContactModal, setPendingContact, runAction],
  );

  const backToAudience = useCallback(() => {
    setContactModal('select-audience');
  }, [setContactModal]);

  const completeTypeSelection = useCallback(
    (typeId, intent = '') => {
      useAppStore.getState().setUserProfile(typeId, intent);
      const pending = pendingContact ?? useAppStore.getState().pendingContact;
      if (!pending) return;

      if (isRetailUser(typeId)) {
        setContactModal('retail-intent');
        return;
      }

      // Negocio: cotizar o registro → formulario en popup
      if (pending.action === 'cotizar' || pending.action === 'registro') {
        setContactModal('business-form');
        return;
      }

      // Negocio: catálogo → ir al catálogo
      setContactModal(null);
      setPendingContact(null);
      runAction(pending.action, {
        intent: intent || pending.intent,
        source: pending.source,
        productName: pending.productName,
      });
    },
    [pendingContact, setContactModal, setPendingContact, runAction],
  );

  const completeRetailIntent = useCallback(
    ({ petName, intent }) => {
      updatePetName(petName);
      if (intent) updateProfileIntent(intent);

      const pending = pendingContact ?? useAppStore.getState().pendingContact;
      setContactModal(null);
      setPendingContact(null);

      if (!pending) return;

      if (pending.action === 'catalogo') {
        navigate('/catalog');
        return;
      }

      runAction(pending.action, {
        intent: intent || pending.intent,
        source: pending.source,
        productName: pending.productName,
      });
    },
    [pendingContact, updateProfileIntent, updatePetName, setContactModal, setPendingContact, runAction, navigate],
  );

  const closeBusinessForm = useCallback(() => {
    setContactModal(null);
    setPendingContact(null);
  }, [setContactModal, setPendingContact]);

  const requestProfileChange = useCallback(() => {
    setContactModal('change-confirm');
  }, [setContactModal]);

  const openBusinessLeadForm = useCallback(
    (options = {}) => {
      const profile = useAppStore.getState().userProfile;
      if (!profile || isRetailUser(profile.typeId)) return;

      setPendingContact({
        action: 'registro',
        intent: profile.intent ?? '',
        source: options.source ?? 'seccion-catalogo',
        productName: options.productName,
      });
      setContactModal('business-form');
    },
    [setContactModal, setPendingContact],
  );

  return {
    userProfile,
    startContactFlow,
    completeAudienceSelection,
    completeTypeSelection,
    completeRetailIntent,
    closeBusinessForm,
    requestProfileChange,
    openBusinessLeadForm,
    backToAudience,
    runAction,
  };
};
