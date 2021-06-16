import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Loader, Title } from "@gnosis.pm/safe-react-components";

import AmountInput from "../../components/AmountInput";
import ContributorNameInput from "../../components/ContributorNameInput";
import ContributorEmailInput from "../../components/ContributorEmailInput";
import ContributeButton from "../../components/ContributeButton";
import ContributeCard from "../../components/ContributeCard";
import GridAgreementFooter from "../../components/GridAgreementFooter";
import GridLogo from "../../components/GridLogo";
import GridWallet from "../../components/GridWallet";
import GuildLogo from "../../components/GuildLogo";
import RiskAgreement from "../../components/RiskAgreement";
import ConnectWeb3Button from "../../components/ConnectWeb3Button";
import { useWeb3Context } from "../../context/Web3Context";

import { useGuild } from "../../hooks/useGuild";
import { ContributorProfile } from "../../types";

const Grid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template:
    "logo form wallet" 1fr
    "footer footer footer" var(--grid-permission-footer-height)
    / 1fr 2fr 1fr;
`;

const Loading = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const GridForm = styled.div`
  grid-area: form;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormItem = styled.div`
  margin: 1rem;
  max-width: 27rem;
  width: 100%;
`;

const GuildContribute: React.FC = () => {
  const {
    ethersProvider,
    getConnectText,
    providerChainId,
    idx,
    did,
    account
  } = useWeb3Context();
  const [activeCurrency, setActiveCurrency] = useState("ETH");

  const [contributorName, setContributorName] = useState("");
  const [contributorEmail, setContributorEmail] = useState("");
  const [guildMinimumAmount, setGuildMinimumAmount] = useState("0");

  const { fetchGuild, subscribe } = useGuild();
  const [loading, setLoading] = useState(true);
  const [guildMetadata, setGuildMetadata] = useState<any>();
  const { guildId } = useParams<{ guildId: string }>();
  console.log("GUILD ID ==>", guildId, providerChainId);

  const submitContribution = async () => {
    setLoading(true);
    try {
      await subscribe(
        providerChainId,
        ethersProvider,
        guildId,
        guildMetadata?.tokenAddress,
        guildMinimumAmount,
        {
          name: contributorName,
          email: contributorEmail
        }
      );
    } catch (error) {
      // TODO: Show an pop-up error
    }
    // set profile
    await saveContributorProfile();
    setLoading(false);
  };

  const saveContributorProfile = async () => {
    const recipients = [did?.id as string];
    // TODO: Add encryption later

    await idx
      ?.set("contributorProfile", {
        name: contributorName,
        email: contributorEmail,
        address: account
      })
      .catch(err => console.error(`Failed to save: ${err}`));
  };

  const setContributorProfile = async () => {
    const profile = (await idx?.get(
      "contributorProfile"
    )) as ContributorProfile;
    if (profile) {
      if (!contributorName) {
        setContributorName(profile.name);
      }
      if (!contributorEmail) {
        setContributorEmail(profile.email);
      }
    }
  };

  useEffect(() => {
    const _fetchGuild = async () => {
      const meta = await fetchGuild(guildId, providerChainId || 4); // TODO: fetch default Network
      if (meta) {
        setGuildMetadata(meta);
      }
      setLoading(false);
    };
    _fetchGuild();
  }, []);

  useEffect(() => {
    const setProfile = async () => {
      await setContributorProfile();
    };
    if (idx) {
      setProfile();
    }
  }, [idx]);

  const connectText = getConnectText();
  return (
    <Grid>
      <GridLogo>
        <GuildLogo />
      </GridLogo>
      {guildMetadata ? (
        <GridForm>
          <Title size="sm" strong={true}>
            {guildMetadata.name}
          </Title>
          <FormItem>
            <ContributorNameInput
              name={contributorName}
              setContributorName={setContributorName}
            />
          </FormItem>
          <FormItem>
            <ContributorEmailInput
              email={contributorEmail}
              setContributorEmail={setContributorEmail}
            />
          </FormItem>
          <FormItem>
            <AmountInput
              title="Monthly Contribution"
              currency={activeCurrency}
              setCurrency={setActiveCurrency}
              amount={guildMinimumAmount}
              setAmount={setGuildMinimumAmount}
            />
          </FormItem>
          <ContributeCard>
            <ContributeButton
              onClick={() => submitContribution()}
              disabled={!providerChainId || loading}
            >
              {!loading ? "Contibute" : "Sending Contribution..."}
            </ContributeButton>
          </ContributeCard>
        </GridForm>
      ) : (
        <Loading>
          {loading ? (
            <Loader size="md" />
          ) : (
            <Title size="sm" strong={true}>
              404: Guild not found
            </Title>
          )}
        </Loading>
      )}
      <GridWallet>
        <ConnectWeb3Button>{connectText}</ConnectWeb3Button>
      </GridWallet>
      <GridAgreementFooter>
        <RiskAgreement />
      </GridAgreementFooter>
    </Grid>
  );
};

export default GuildContribute;
