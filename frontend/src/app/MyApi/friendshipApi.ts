import { Backend_URL } from "../../../lib/Constants";
import Cookies from "js-cookie";

// ================================================================
// ================================================================
// ==========================     Gets   ==========================
// ================================================================
// ================================================================

export async function getNavSearchUsers(userId: string) {
  let res: friendDto[] = [];
  try {
    if (!userId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${Backend_URL}/friendship/navSearchUsers/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    console.log("getNavSearchUsers error: " + error);
    return res;
  }
}

export async function getUserByNick(recieverUsr: string) {
  let res: ownerDto = {
    id: "-1",
    intra_id: "",
    first_name: "",
    last_name: "",
    nickname: "",
    profilePic: "",
    isTwoFactorAuthEnabled: true,
    level: "0.0",
  };
  try {
    if (!recieverUsr) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${Backend_URL}/friendship/getUserByNick/${recieverUsr}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    console.log("getUserByNick error: " + error);
    return res;
  }
}

export async function getIsBlocked(senderId: string, recieverId: string) {
  let res = {
    isBlocked: false,
  };
  try {
    if (!senderId || !recieverId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${Backend_URL}/friendship/isBlocked/${senderId}/${recieverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    console.log("getIsBlocked error: " + error);
    return res;
  }
}

export async function getOnlineFriends(userId: string) {
  let res: friendDto[] = [];
  try {
    if (!userId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${Backend_URL}/friendship/onlineFriends/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }

    return res;
  } catch (error: any) {
    console.log("getOnlineFriends error: " + error);
    return res;
  }
}

export async function getAllFriends(userId: string) {
  let res: friendDto[] = [];
  try {
    if (!userId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${Backend_URL}/friendship/allFriends/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    console.log("getAllFriends error: " + error);
    return res;
  }
}

export async function getPendingFriends(userId: string) {
  let res: friendDto[] = [];
  try {
    if (!userId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${Backend_URL}/friendship/pendingFriends/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    console.log("getPendingFriends error: " + error);
    return res;
  }
}

export async function getBlockedFriends(userId: string) {
  let res: friendDto[] = [];
  try {
    if (!userId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${Backend_URL}/friendship/blockedFriends/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    console.log("getBlockedFriends error: " + error);
    return res;
  }
}

export async function getAllPossibleFriends(userId: string) {
  let res: friendDto[] = [];
  try {
    if (!userId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${Backend_URL}/friendship/allPossibleFriends/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    console.log("getAllPossibleFriends error: " + error);
    return res;
  }
}

// ============================ POSTS ============================
// ============================ POSTS ============================
// ============================ POSTS ============================
// ============================ POSTS ============================
// ============================ POSTS ============================
// ============================ POSTS ============================
// ============================ POSTS ============================

export async function removeFriend(senderId: string, recieverId: string) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${Backend_URL}/friendship/removeFriend/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    console.log("removeFriend error: " + error);
  }
}

export async function blockFriend(senderId: string, recieverId: string) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${Backend_URL}/friendship/blockFriend/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    console.log("blockFriend error: " + error);
  }
}

export async function unblockFriend(senderId: string, recieverId: string) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${Backend_URL}/friendship/unblockFriend/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    console.log("unblockFriend error: " + error);
  }
}

export async function sendFriendRequest(senderId: string, recieverId: string) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${Backend_URL}/friendship/sendFriendRequest/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    console.log("sendFriendRequest error: " + error);
  }
}

export async function unsendFriendRequest(
  senderId: string,
  recieverId: string
) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${Backend_URL}/friendship/unsendFriendRequest/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    console.log("unsendFriendRequest error: " + error);
    return null;
  }
}

export async function rejectFriendRequest(
  senderId: string,
  recieverId: string
) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${Backend_URL}/friendship/rejectFriendRequest/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    console.log("rejectFriendRequest error: " + error);
  }
}

export async function acceptFriendRequest(
  senderId: string,
  recieverId: string
) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${Backend_URL}/friendship/acceptFriendRequest/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    console.log("acceptFriendRequest error: " + error);
  }
}