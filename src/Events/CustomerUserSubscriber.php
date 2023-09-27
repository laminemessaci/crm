<?php

namespace App\Events;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use App\Entity\Customer;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CustomerUserSubscriber implements EventSubscriberInterface
{

    /**
     * Undocumented variable
     *
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * Constructs a new instance of the class.
     *
     * @param TokenStorageInterface $tokenStorage The token storage interface.
     */
    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }


    /**
     * Retrieves the list of events to which the object should listen.
     *
     * @return array The list of events and their associated listeners.
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForCustomer', EventPriorities::PRE_VALIDATE]
        ];
    }

    /**
     * Sets the user for the customer based on the view event.
     *
     * @param ViewEvent $event The view event object.
     * @throws None
     * @return void
     */
    public function setUserForCustomer(ViewEvent $event): void
    {
        $controllerResult = $event->getControllerResult();
        $requestMethod = $event->getRequest()->getMethod();

        if ($controllerResult instanceof Customer && ($requestMethod === "PUT" || $requestMethod === "POST")) {
            $user = $this->tokenStorage->getToken()->getUser();
            $controllerResult->setUser($user);
        }
    }
}
