<?php

namespace App\Events;

use App\Entity\User;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class PasswordHasherSubscriber implements EventSubscriberInterface
{

    /**
     * L'encodeur de mots de passe
     *
     * @var UserPasswordHasherInterface
     */
    private $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['hashPassword', EventPriorities::PRE_WRITE]
        ];
    }

    /**
     * Hashes the password of a User object if the request method is POST.
     *
     * @param ViewEvent $event The ViewEvent object.
     * @throws None
     * @return void
     */
    public function hashPassword(ViewEvent $event): void
    {
        //dd($event);
        $object = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($object instanceof User && $method === "POST") {
            $hash = $this->hasher->hashPassword($object, $object->getPassword());
            $object->setPassword($hash);
        }
    }
}
