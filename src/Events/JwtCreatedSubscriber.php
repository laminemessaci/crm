<?php

namespace App\Events;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{
    /**
     * Updates the JWT data with the user's first and last name.
     *
     * @param JWTCreatedEvent $event The JWT created event.
     */
    public function updateJwtData(JWTCreatedEvent $event)
    {
        $user = $event->getUser();
        if ($user instanceof User) {
            $data = $event->getData();
            $data["firstname"] = $user->getFirstName();
            $data["lastname"] = $user->getLastName();
            $data["totalTransactions"] = number_format($user->getTotalTransactions(), 2, '.', '');

            $event->setData($data);
        }
    }
}
