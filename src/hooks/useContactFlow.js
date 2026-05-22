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
          source,
          productName,
        });
        window.open(whatsAppUrl(message), '_blank', 'noopener,noreferrer');
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
      setContactModal('select-type');
    },
    [location.pathname, setPendingContact, setContactModal],
  );

  const completeTypeSelection = useCallback(
    (typeId, intent = '') => {
      useAppStore.getState().setUserProfile(typeId, intent);
      const pending = pendingContact ?? useAppStore.getState().pendingContact;
      if (!pending) return;

      if (isRetailUser(typeId)) {
        if (pending.action === 'cotizar' && !intent && !pending.intent) {
          setContactModal('retail-intent');
          return;
        }
        setContactModal(null);
        setPendingContact(null);
        runAction(pending.action, {
          intent: intent || pending.intent,
          source: pending.source,
          productName: pending.productName,
        });
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
    (intent) => {
      updateProfileIntent(intent);
      const pending = pendingContact ?? useAppStore.getState().pendingContact;
      setContactModal(null);
      setPendingContact(null);
      if (pending) {
        runAction(pending.action, { ...pending, intent });
      }
    },
    [pendingContact, updateProfileIntent, setContactModal, setPendingContact, runAction],
  );

  const closeBusinessForm = useCallback(() => {
    setContactModal(null);
    setPendingContact(null);
  }, [setContactModal, setPendingContact]);

  const requestProfileChange = useCallback(() => {
    setContactModal('change-confirm');
  }, [setContactModal]);

  return {
    userProfile,
    startContactFlow,
    completeTypeSelection,
    completeRetailIntent,
    closeBusinessForm,
    requestProfileChange,
    runAction,
  };
};
